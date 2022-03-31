<template></template>

<script>
export default {
  async asyncData({ $axios, params, store }) {
    try {
      const res = await $axios.$post('/v1/projects/investments/investment', {
        investmentID: params.id,
      })
      const project = res.data.investment
      return { project }
    } catch (error) {
      return { error, project: {} }
    }
  },
}
</script>

<style></style>
