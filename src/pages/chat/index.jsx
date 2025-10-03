// import React, { useEffect, useState } from "react";
// import {
//   Fab,
//   Box,
//   Paper,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
// } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";
// import CloseIcon from "@mui/icons-material/Close";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8000"); // backend server
// const ChatWidget = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [input, setInput] = useState("");
//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });
//     console.log(user);
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, []);

//   // Handle sending messages
//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message
//     const newMessage = { from: user.name, text: input };

//     socket.emit("sendMessage", newMessage);
//     setInput("");
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <Box
//         sx={{
//           position: "fixed",
//           bottom: 16,
//           right: 16,
//           zIndex: 9999,
//         }}
//       >
//         <Fab color="primary" onClick={() => setOpen(!open)}>
//           <ChatIcon />
//         </Fab>
//       </Box>

//       {/* Chat Box */}
//       {open && (
//         <Paper
//           elevation={6}
//           sx={{
//             position: "fixed",
//             bottom: 80,
//             right: 16,
//             width: 320,
//             height: 400,
//             display: "flex",
//             flexDirection: "column",
//             borderRadius: 2,
//             overflow: "hidden",
//             zIndex: 9999,
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               bgcolor: "primary.main",
//               color: "white",
//               px: 2,
//               py: 1,
//             }}
//           >
//             <Typography variant="subtitle1">Chat Support</Typography>
//             <IconButton
//               size="small"
//               onClick={() => setOpen(false)}
//               sx={{ color: "white" }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Box>

//           {/* Chat Body */}
//           <Box
//             sx={{
//               flex: 1,
//               p: 2,
//               overflowY: "auto",
//               bgcolor: "#f9f9f9",
//             }}
//           >
//             {messages.map((msg, index) => {
//               const isMine = msg.from === user.name;

//               return (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     mb: 1,
//                   }}
//                 >
//                   {/* Only show sender name if not mine */}
//                   {!isMine && (
//                     <Typography variant="caption" sx={{ mb: 0.5 }}>
//                       {msg.from}
//                     </Typography>
//                   )}

//                   <Typography
//                     sx={{
//                       alignSelf: isMine ? "flex-end" : "flex-start", // ✅ FIX HERE
//                       bgcolor: isMine ? "primary.main" : "grey.300",
//                       color: isMine ? "white" : "black",
//                       px: 2,
//                       py: 1,
//                       borderRadius: 2,
//                       maxWidth: "70%",
//                     }}
//                   >
//                     {msg.text}
//                   </Typography>
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* Chat Input */}
//           <Box
//             component="form"
//             onSubmit={handleSend}
//             sx={{
//               display: "flex",
//               borderTop: "1px solid #ddd",
//               p: 1,
//               gap: 1,
//             }}
//           >
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <Button type="submit" variant="contained">
//               Send
//             </Button>
//           </Box>
//         </Paper>
//       )}
//     </>
//   );
// };

// export default ChatWidget;
