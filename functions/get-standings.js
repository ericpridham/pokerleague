const { Pool } = require('pg')

const pool = new Pool()

exports.handler = async function(event, context) {
  let { season } = event.queryStringParameters;

  const client = await pool.connect()

  if (!season) {
    const { rows } = await client.query('select max(id) last_season from seasons')
    season = rows[0].last_season;
  }

  const standingsQuery = `
    select
      row_number() over (order by total_points desc) as rank,
      display_name,
      total_points,
      tf.top_finishes
    from (
           select player_id, sum(points) total_points
           from players p
                  join standings s on p.id = s.player_id
                  join games g on s.game_id = g.id
           where g.season_id = $1
           group by player_id
         ) st
    left join (
      select player_id, array_agg(concat(s.rank, '-', g.number) order by s.rank, g.number) top_finishes
      from standings s
             join games g on s.game_id = g.id
      where g.season_id = $1 and s.rank <= 3
      group by player_id
    ) as tf on tf.player_id = st.player_id
           join players p on p.id = st.player_id
           left join users u on cast(u.meetup_id as varchar(255)) = p.meetup_id
    order by total_points desc;
`;

  const { rows } = await client.query(standingsQuery, [season])
  await client.end()

  return {
    statusCode: 200,
    body: JSON.stringify(rows)
  };
}
