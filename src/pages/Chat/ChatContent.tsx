import { useAppSelector } from 'hooks'

import Messages from './Messages'

const ChatContent = () => {
  const checkChat = useAppSelector((state) => state.chat.checkChatInDb)
  return (
    <div>
      {checkChat ? <Messages /> : <h1>you have no messages with this user</h1>}
    </div>
  )
}

export default ChatContent
