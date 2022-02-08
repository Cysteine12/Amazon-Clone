<template>
<div v-if="statCheck.status !== ''">
    <div class="card p-0-5 alert-success mw-small m-auto">
        <span>{{ statCheck.status }}</span>
    </div>
</div>
<div v-if="statCheck.err !== ''">
    <div class="card p-0-5 alert-error mw-small m-auto">
        <span>{{ statCheck.err }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'StatCheck',
    props: {
        statCheck: {
            type: Object,
            default: ''
        }
    }
}
</script>