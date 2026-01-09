<template>
</template>

<script>

import currentYear from '../currentYear';

export default {
    
    created() {
       this.$router.push(`/${currentYear}`)
    }
}
</script>

