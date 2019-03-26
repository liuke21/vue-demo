<template>
    <div>
        <comm :id="this.$route.params.id"></comm>
    </div>
</template>
<script>
import comm from '../comments/comment.vue'
export default {
    components:{
        comm
    }
}
</script>
<style lang="scss" scoped>

</style>
