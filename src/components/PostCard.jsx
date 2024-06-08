import { useContext, useEffect, useRef, useState } from "react";
import TimeAgo from "timeago-react";

import { AppContext, route } from "../App";

import { toast } from "react-hot-toast";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import CommentCard from "./CommentCard";

const PostCard = ({ post, date }) => {
  const [comments, setComments] = useState([]);
  const [commentContentt, setCommentContent] = useState("");
  const [reactsNum, setReactsNum] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [myReact, setMyReact] = useState("");
  const [refresh, setRefresh] = useState(0);
  const token = localStorage.getItem("token");
  const myId = JSON.parse(localStorage.getItem("data"))._id;
  const { setLoading } = useContext(AppContext);
  const [reacts, setReacts] = useState({});
  const [updateId, setUpdateId] = useState("");
  const [gotComments, setGotComments] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");
  const datee = new Date(post?.createdAt);

  // useEffect(() => {
  //   fetch(`${route}/analytic/posts/${post._id}/postReacts`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       var love = 0;
  //       var haha = 0;
  //       var like = 0;
  //       setReactsNum(data.data);
  //       data?.data?.map((e) => {
  //         if (e.type === "love") {
  //           love += 1;
  //         } else if (e.type === "haha") {
  //           haha += 1;
  //         } else if (e.type === "like") {
  //           like += 1;
  //         }
  //       });

  //       setReacts({ love, haha, like });
  //     });
  // }, [post._id, route, refresh]);
  const getComments = () => {
    setLoading(true);
    fetch(`${route}/posts/${post._id}/postComments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data);
        console.log(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createComment = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("post", post._id);
    formData.append("content", commentContentt);
    if (profileImg) {
      formData.append("image", profileImg, profileImg.name);
    }
    if (updateId) {
      fetch(`${route}/postComments/${updateId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setCommentContent("");
            setLoading(false);
            setCommentContent("");
            setProfileImg(null);
            toast.success("Comment Added");
            getComments();
          } else {
            setLoading(false);
            toast.error("Comment not shared");
          }
        })
        .catch(() => toast.error("Something went wrong"));
    } else {
      fetch(`${route}/postComments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setCommentContent("");
            setLoading(false);
            setCommentContent("");
            setProfileImg(null);
            toast.success("Comment Added");
            getComments();
          } else {
            setLoading(false);
            toast.error("Comment not shared");
          }
        })
        .catch(() => toast.error("Something went wrong"));
    }
  };
  const CreateReact = (type) => {
    setLoading(true);
    fetch(`${route}/postReacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: post._id,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("React Added");
          setRefresh((prev) => prev + 1);
        } else {
          setLoading(false);
          toast.success("React deleted");
          setRefresh((prev) => prev + 1);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(file);
    } else {
      setProfileImg(null);
    }
  };
  useEffect(() => {
    if (reactsNum.length != 0) {
      setMyReact(reactsNum.find((react) => react?.userId?._id === myId)?.type);
    }
  }, [reactsNum]);

  //  image modal zoom
  const conntainer = useRef();

  return (
    <>
      {imageModalSrc && (
        <div className="fixed z-10 inset-0 w-full h-full bg-[black] bg-opacity-75 flex items-center justify-center">
          <div className="container overflow-hidden bg-blackGold p-4 rounded-xl w-fit">
            <button
              className="text-2xl cursor-pointer mb-4"
              onClick={() => setImageModalSrc("")}
            >
              <IoCloseCircleOutline />
            </button>
            <div
              className="max-w-[100%] w-fit overflow-hidden"
              ref={conntainer}
              onMouseMove={(e) => {
                if ("ontouchstart" in window || navigator.maxTouchPoints) {
                  document.querySelector(
                    ".maaaain"
                  ).style.transformOrigin = `center`;
                  document.querySelector(".maaaain").style.transform =
                    "scale(1)";
                } else {
                  let react = conntainer.current.getBoundingClientRect();
                  const x = e.clientX - react.left;
                  const y = e.clientY - react.top;
                  document.querySelector(
                    ".maaaain"
                  ).style.transformOrigin = `${x}px ${y}px`;
                  document.querySelector(".maaaain").style.transform =
                    "scale(2)";
                }
              }}
              onMouseLeave={() => {
                document.querySelector(
                  ".maaaain"
                ).style.transformOrigin = `center`;
                document.querySelector(".maaaain").style.transform = "scale(1)";
              }}
            >
              <img
                src={imageModalSrc}
                className="maaaain cursor-zoom-in max-h-[80vh] rounded-xl"
                style={{ transformOrigin: "center", objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-blackGold p-4 my-4 rounded-2xl">
        <div>
          <div className="flex gap-4">
            <div className="bg-gray w-12 h-12 flex relative justify-center items-center rounded-full">
              <i className="fa-solid fa-user"></i>
              <img
                src={post?.user?.profileImg}
                onError={(e) => e.target.classList.add("opacity-0")}
                className={`absolute w-12 h-12 top-0 right-0 rounded-full ${
                  post?.user?.profileImg ? "" : "opacity-0"
                }`}
                alt=""
              />
            </div>
            <div>
              <div>{post.user?.name}</div>
              <div className="text-gray text-xs">
                {date ? (
                  <>
                    {datee.toLocaleDateString()} - {datee.toLocaleTimeString()}
                  </>
                ) : (
                  <TimeAgo datetime={post.createdAt} />
                )}
              </div>
            </div>
          </div>
          <div className="my-4">{post.content}</div>
        </div>

        {post.image ? (
          <img
            src={post.image}
            onError={(e) => e.target.classList.add("hidden")}
            onClick={() => setImageModalSrc(post.image)}
            className="w-full my-4 cursor-pointer"
            alt="postLogo"
          />
        ) : null}

        <div className="reacts flex border-gray border rounded-lg my-6">
          <div
            onClick={() => CreateReact("like")}
            className="cursor-pointer group py-2 flex-1 w-full flex justify-center items-center"
          >
            <div
              className={`h-8 w-8 flex group-hover:bg-blue transition-all justify-center items-center rounded-full ${
                myReact === "like" ? "bg-blue" : "bg-gray"
              }`}
            >
              <i className="fa-solid fa-thumbs-up"></i>
            </div>
            <span className="mr-2">{reacts?.like}</span>
          </div>
          <div
            onClick={() => CreateReact("love")}
            className="cursor-pointer group py-2 flex-1 border-x-gray border-x w-full flex justify-center items-center"
          >
            <div
              className={`h-8 w-8 flex group-hover:bg-red transition-all justify-center items-center rounded-full ${
                myReact === "love" ? "bg-red" : "bg-gray"
              }`}
            >
              <i className="fa-solid fa-heart"></i>
            </div>
            <span className="mr-2">{reacts?.love}</span>
          </div>
          <div
            onClick={() => CreateReact("haha")}
            className="cursor-pointer group py-2 flex-1 w-full flex justify-center items-center"
          >
            <div
              className={`h-8 w-8 flex group-hover:bg-gold transition-all justify-center items-center rounded-full ${
                myReact === "haha" ? "bg-gold" : "bg-gray"
              }`}
            >
              <i className="fa-regular fa-face-smile"></i>
            </div>
            <span className="mr-2">{reacts?.haha}</span>
          </div>
        </div>

        <div>
          <form
            onSubmit={(e) => {
              createComment(e);
            }}
            className="flex gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Add Comment"
              required
              value={commentContentt}
              className="rounded-full bg-goldenGray p-2 px-4 pb-3 w-full"
              onChange={(e) => setCommentContent(e.target.value)}
            />

            <div className="relative  whitespace-nowrap p0 w-12">
              <input
                type="file"
                id="file-input"
                className="absolute top-0 left-0 flex-1  h-full w-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-input"
                className="w-12 h-12 flex items-center justify-center text-xl text-center capitalize m-auto text-dark bg-gold rounded-full cursor-pointer"
              >
                <i className="fa-solid fa-image"></i>
              </label>
            </div>
            <button
              className="relative bg-lightGold text-gold pr-3 pl-16 font-semibold h-12 rounded-full"
              onClick={() => createComment(post._id)}
            >
              {updateId ? "عدل" : "أضف"}
              <div className="absolute bg-gold text-dark w-12 h-12 flex justify-center items-center rounded-full top-0 left-0">
                <i className=" fa-solid fa-paper-plane"></i>
              </div>
            </button>
          </form>
          <div className="flex gap-4 text-gray text-xs my-4">
            {/* <div>تعليقات ({comments.length})</div>- */}
            {/* <div>كل التفاعلات ({reactsNum.length})</div> */}
          </div>
          <div className="max-h-[800px] overflow-y-auto">
            {comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                setRefresh={setRefresh}
                setImageModalSrc={setImageModalSrc}
                setCommentContent={setCommentContent}
                setUpdateId={setUpdateId}
                getComments={getComments}
              />
            ))}
            {!gotComments && (
              <button
                className="bg-goldenGray block px-6 py-2 rounded-lg w-fit mx-auto "
                onClick={() => {
                  if (!gotComments) {
                    setGotComments(true);
                    getComments();
                  }
                }}
              >
                اظهر التعليقات{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
