<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Message;
use App\Notifications\OpenAINotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class OpenAICommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:openai { message_id }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ask openai';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $messageId = $this->argument('message_id');

        $message = Message::find($messageId);

        $messages = [
            [
                'role' => 'user',
                'content' => $message->message,
            ]
        ];

        // スレッドとするなら、過去のすべてのレコードを使う。ユーザーを特定していないので注意。
        // $messages = Message::orderBy('id')
        //     ->get()
        //     ->map(function ($message) {
        //         $role = $message->user_id === config('openai.ai_user_id') ? 'assistant' : 'user';
        //         return ['role' => $role, 'content' => $message->message];
        // })
        // ->toArray();

        $response = OpenAI::chat()->create([
            'model'    => config('openai.ai_model'),
            'messages' => $messages,
        ]);

        Log::debug(print_r($response, true));

        $answer = $response->choices[0]->message->content;

        $ai = User::find(config('openai.ai_user_id'));

        $ai->messages()->create([
            'message' => $answer,
        ]);

        $user = User::find(1);
        $user->notify(new OpenAINotification($answer));

        return Command::SUCCESS;
    }
}
