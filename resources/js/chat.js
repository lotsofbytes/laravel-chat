/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import { createApp, ref } from 'vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';
import ChatToast from './components/ChatToast.vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

createApp({
    setup () {
        const messages = ref([]);
        const toast = ref({});

        fetchMessages();

        window.Echo.private('chat')
            .listen('MessageSent', (e) => {
                messages.value.push({
                    message: e.message.message,
                    user: e.user
                });
            });

        window.Echo.private('App.Models.User.' + window.userId)
            .notification((notification) => {
                toast.value = notification;
            });

        function fetchMessages() {
            axios.get('/messages').then(response => {
                messages.value = response.data;
            });
        }

        function addMessage(message) {
            messages.value.push(message);

            axios.post('/messages', message).then(response => {
                // success
            });
        }

        return {
            toast,
            messages,
            fetchMessages,
            addMessage
        }
    }
})
.component('chat-messages', ChatMessages)
.component('chat-form', ChatForm)
.component('chat-toast', ChatToast)
.mount('#app');
