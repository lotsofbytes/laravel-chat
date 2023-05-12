/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//const { default: Echo } = require('laravel-echo');
//require('./bootstrap');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */


//window.Pusher = require('pusher-js');
require('pusher-js');

import Echo from 'laravel-echo';

//window.Echo = new Echo({
const laravelEcho = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: '/laravel-chat/broadcasting/auth'
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = {
    data() {
        return {
            messages: []
        }
    },

    created() {
        this.fetchMessages();

        laravelEcho.private('chat')
            .listen('MessageSent', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
            });
    },

    methods: {
        fetchMessages() {
            axios.get('/laravel-chat/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/laravel-chat/messages', message).then(response => {
                console.log(response.data);
            });
        }
    },

    components: {
        'chat-messages' : require('./components/ChatMessages.vue').default,
        'chat-form' : require('./components/ChatForm.vue').default,
    }
};

import { createApp } from 'vue';


createApp(app).mount('#app');

/*

window.Vue = require('vue').default;

app.component('chat-messages', require('./components/ChatMessages.vue').default);
app.component('chat-form', require('./components/ChatForm.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        messages: []
    },

    created() {
        this.fetchMessages();

        window.Echo.private('chat')
            .listen('MessageSent', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
            });
    },

    methods: {
        fetchMessages() {
            axios.get('/laravel-chat/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/laravel-chat/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
}); */
