<template>
	<div class="home-page">
        <datetime 
            :phrases="{
                ok: 'Ok', 
                cancel: 'Отмена'
            }"
            format="EEEE"
            v-model="date"
        ></datetime>
	</div>
</template>

<script>
        // Подключение компонентов
    import { Datetime } from '../component/vue-datetime/index.js';

	export default {
    	name: "home-page",
        props: [],
        data () {
            return {
                date: ''
            }
        },
        mounted () {
            let DateObj = new Date;
            this.date = DateObj.toISOString();
        },
        components: {
            datetime: Datetime
        },
	}
</script>