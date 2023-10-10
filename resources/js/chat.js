/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import { createApp, ref } from 'vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';
import ConfirmModal from './components/ConfirmModal.vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

createApp({
    setup () {
        const messages = ref([]);
        const modalVisible = ref(false);

        fetchMessages();

        // 通知権限が既に決定されているかどうかを調べる
        if (Notification.permission === 'default') {
            modalVisible.value = true;
        }

        window.Echo.private('chat')
            .listen('MessageSent', (e) => {
                messages.value.push({
                    message: e.message.message,
                    user: e.user
                });
            });

        window.Echo.private('App.Models.User.' + window.userId)
            .notification((n) => {
                 // 通知権限が既に付与されているなら、通知を作成
                if (Notification.permission === 'granted') {
                    const notification = new Notification(
                        'ご連絡',
                        {
                            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/180px-Laravel.svg.png',
                            body: n.message
                        }
                    );
                    notification.onclick = () => {
                        window.open('https://larajapan.com');
                    }
                }
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

        function askPermission() {
            modalVisible.value = false;

            Notification.requestPermission().then((permission) => {
                console.log(permission);
            });
        }

        return {
            messages,
            fetchMessages,
            addMessage,
            modalVisible,
            askPermission
        }
    }
})
.component('chat-messages', ChatMessages)
.component('chat-form', ChatForm)
.component('confirm-modal', ConfirmModal)
.mount('#app');
