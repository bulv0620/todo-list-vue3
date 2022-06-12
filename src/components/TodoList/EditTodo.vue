<script setup>

const props = defineProps({
    'editText' : {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update:editText'])
</script>

<template>
    <input
        type="text"
        v-model="editText"
        @input="$emit('update:editText', $event.target.value)"
        v-bind="$attrs"
    />
</template>

<style lang='less' scoped>
</style>