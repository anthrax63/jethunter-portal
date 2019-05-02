import React, { Component, Fragment } from "react";
import ChatList from "../../apexLib/containers/chat/chatList";
import ChatSearch from "../../apexLib/containers/chat/chatSearch";
import ChatContent from "../../apexLib/containers/chat/chatContent";
import ChatMsgSend from "../../apexLib/containers/chat/chatMsgSend";
import PerfectScrollbar from "react-perfect-scrollbar";

class Chat extends Component {
    
   render() {
      return (
         <Fragment>
            <div className="chat-application">
                <div className="content-overlay"></div>
                <div className="chat-sidebar float-left d-none d-sm-none d-md-block d-lg-block">
                    <PerfectScrollbar>
                        <div className="chat-sidebar-content">
                            <ChatSearch />
                            <ChatList />
                        </div>
                    </PerfectScrollbar>
                </div>

                <ChatContent />

                <ChatMsgSend />
            </div>
         </Fragment>
      );
   }
}

export default Chat;
