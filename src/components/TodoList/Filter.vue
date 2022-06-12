<script setup>
const props = defineProps({
    modelValue: { type: String, required: true },
    statusList: {type: Array, required: true},
});
</script>

<template>
    <div class="status-option">
        <span v-for="status in statusList" :key="status"
            :class="{ active: modelValue === status }"
            @click="$emit('update:modelValue', status)"
            >{{status}}</span
        >
    </div>
</template>

<style lang='less' scoped>
.status-option {
    span {
        padding: 0 10px;
        cursor: pointer;

        &.active {
            border: 1px solid #e3e3e3;
        }
    }
}
</style>