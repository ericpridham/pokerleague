<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Player
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Top Finishes
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="player in standings">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-2xl mx-2">
                    {{ player.rank }}
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 ml-4">
                    <img class="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                         alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-lg font-medium text-gray-900">
                      {{ player.display_name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="player.topFinishes" v-for="finish in player.topFinishes" :title="'Rank ' + finish.rank + ' Game ' + finish.game" class="inline-flex mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" :class="{'bg-yellow-400 text-yellow-600': finish.rank === 1, 'bg-gray-400 text-gray-600': finish.rank === 2, 'bg-orange-400 text-orange-600': finish.rank === 3 }" class="w-10 p-1 text-xs leading-5 font-semibold rounded-full">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-lg text-right">
                {{ player.total_points }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StandingsTable",
  data() {
    return {
      standings: []
    }
  },
  async mounted() {
    this.standings = await fetch('/.netlify/functions/get-standings?season=' + (this.$route.query.season || ''))
      .then((res) => res.json());
    // this.standings =  [
    //   {
    //     rank: 1,
    //     display_name: "Kelly",
    //     topFinishes: [
    //       {
    //         rank: 1,
    //         game: 3
    //       },
    //       {
    //         rank: 3,
    //         game: 2
    //       }
    //     ],
    //     total_points: 1234,
    //   },
    //   {
    //     rank: 2,
    //     display_name: "David W.",
    //     topFinishes: [
    //       {
    //         rank: 2,
    //         game: 1
    //       }
    //     ],
    //     total_points: 1122,
    //   }
    // ]
  }
}
</script>

<style scoped>

</style>
