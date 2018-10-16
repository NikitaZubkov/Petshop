<template>
    <div id="app">
        <HomePage></HomePage>
    </div>
</template>

<script>
        // Подключение компонентов
    import HomePage from './views/page/home-page.vue';

    export default {
        name: 'app',
        components: {
            HomePage
        }
    }
</script>
