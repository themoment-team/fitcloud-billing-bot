# themoment-team infra bot

Hello, GSM aws 계정의 billing을 간편하게 보실 수 있습니다

## Run

```bash
$ node app.js
```

실행 시, 채널에 현재 요금을 보고한 뒤 종료됩니다.

## 사용 요령

crontab으로 스케줄링 하여 일정 시간마다 요금을 보고하도록 할 수 있습니다.

- github action을 활용하여 매일 대한민국 표준시 09:00에 실행됩니다.

## .env 파일 구성

- ID : fitcloud id
- PASSWORD : fitcloud password
- DISCORD_BOT_TOKEN : discord bot token
- DISCORD_CHANNEL_ID : The ID of the channel to send the message to.
