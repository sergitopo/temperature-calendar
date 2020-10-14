<template>
</template>

<script>

const currentYear = 2020;

export default {
    
    created() {
       this.$router.push(`/${currentYear}`)
    }
}
</script>

