import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import {
  getListOfFriends,
  selectAuthUser,
} from 'features/authentication/sessionSlice'
import { checkChatInDb, setFriendsUid } from 'features/chat/chatSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { AuthUser } from 'interfaces'
import { useEffect } from 'react'

const UsersList = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  const authUid = authUser?.uid

  const getFriendsList = async (authUser: AuthUser) => {
    return await dispatch(getListOfFriends(authUser))
  }

  useEffect(() => {
    if (!authUser) return
    getFriendsList(authUser)
  }, [authUser])

  const list = Object.keys(useAppSelector((state) => state.session.friendsList))

  return (
    <List>
      {list.map((friend) => {
        return (
          <ListItem
            button
            key={friend}
            onClick={() => {
              dispatch(setFriendsUid(friend))
              dispatch(checkChatInDb({ authUid, friend }))
            }}
          >
            <ListItemIcon>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary={friend.substring(0, 10)}>
              {friend}
            </ListItemText>
            <ListItemText secondary="online"></ListItemText>
          </ListItem>
        )
      })}
    </List>
  )
}

export default UsersList
