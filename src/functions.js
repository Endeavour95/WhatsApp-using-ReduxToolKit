import moment from "moment";
import { setButtonLeftTopNavigation, setLeftBelowSearchBarButtons, setLeftTopNavigationButtons } from "./slices/buttonsSlice";
import { setChats, setSearchText, updateMessageStatus } from "./slices/chatsSlice";
import { setUnreadMessages, setSelectedUserMobileNo } from "./slices/usersSlice";

export const openWhatsAppDesktop = () => {
    return (dispatch) => {
        const microsoftStoreLink = 'https://www.microsoft.com/store/productId/9NKSQGP7F2NH?ocid=pdpshare';
        window.open(microsoftStoreLink, '_blank');
    };
};

export const handleLeftPannelBelowSearchBarButtons = (obj) => {
    return (dispatch) => {
        dispatch(setLeftBelowSearchBarButtons(obj))
    }
}

export const handleLeftPannelSearchBar = (value) => {
    return (dispatch) => {
        dispatch(setSearchText(value))
    }
}

export const handleLeftTopNavigation = (obj) => {
    return (dispatch) => {
        dispatch(setLeftTopNavigationButtons(obj))
    }
}

export const handleLeftUsersList = (mobileNo) => {
    return (dispatch) => {
        // console.log("selectedUserMobileNo", mobileNo)

        dispatch(setSelectedUserMobileNo(mobileNo))
    }
}

export const handlePersonalProfileInfoDrawer = (obj) => {
    return (dispatch) => {
        dispatch(setButtonLeftTopNavigation(obj))
    }
}

export const generateMessage = (text) => {
    return (dispatch, getState) => {
        const chats = getState().chats.chats
        const selectedUserMobileNo = getState().peoples.selectedUserMobileNo
        dispatch(setChats({
            "messageId": chats.length < 1 ? 1 : Number(chats[chats.length - 1].messageId) + 1,
            "messageText": text,
            "messageTime": moment().format('HH:mm'),
            "messageDate": moment().format('YYYY-MM-DD'),
            "userMobileNo": selectedUserMobileNo,
            "deliveredStatus": false,
            "readStatus": false,
        }))
        dispatch(stateUpdated(text))
    }
}

export function stateUpdated(text) {
    return (dispatch, getState) => {
        const chats = getState().chats.chats
        const lastChat = chats[chats.length - 1]
        console.log("text", text)
        if (Object.hasOwn(lastChat, "deliveredStatus")) {
            setTimeout(() => {
                dispatch(updateMessageStatus({ messageId: lastChat.messageId, status: "deliveredStatus", value: true }))
            }, 2000);
            setTimeout(() => {
                dispatch(updateMessageStatus({ messageId: lastChat.messageId, status: "readStatus", value: true }))
            }, 5000);
            setTimeout(() => {
                dispatch(generateReplyMessage(text))
            }, 10000);
        }
    }
}

export function generateReplyMessage(text) {
    return (dispatch, getState) => {
        const chats = getState().chats.chats
        const selectedUserMobileNo = getState().peoples.selectedUserMobileNo
        dispatch(setChats({
            "messageId": chats.length < 1 ? 1 : Number(chats[chats.length - 1].messageId) + 1,
            "messageText": text + " reply Message",
            "messageTime": moment().format('HH:mm'),
            "messageDate": moment().format('YYYY-MM-DD'),
            "userMobileNo": selectedUserMobileNo,
        }))
    }
}