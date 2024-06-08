import { useContext, useState } from "react";
import TimeAgo from "timeago-react";
import { AppContext, route } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const CommentCard = ({
  comment,
  setRefresh,
  getComments,
  setImageModalSrc,
  setCommentContent,
  setUpdateId,
}) => {
  const role = JSON.parse(localStorage.getItem("data")).role;
  const token = localStorage.getItem("token");
  const myId = JSON.parse(localStorage.getItem("data"))._id;

  const [addingReplay, setAddingReplay] = useState(false);
  const [replay, setReplay] = useState("");
  const [editId, setEditId] = useState("");
  const { setLoading } = useContext(AppContext);
  const deleteComment = (id) => {
    setLoading(true);

    axios
      .delete(`${route}/analytic/postComments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("comment has been deleted");
        setRefresh((prev) => prev + 1);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteReplay = (id) => {
    setLoading(true);

    axios
      .delete(`${route}/analytic/postComments/deleteReplyComment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("comment has been deleted");
        getComments();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createReplay = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${route}analytic/postComments/replyToComment/${comment?._id}`,
        { userId: myId, content: replay },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("تم اضافه الرد");
        setAddingReplay(false);
        getComments();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const update = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${route}analytic/postComments/editReplyComment/${editId}`,
        { content: replay },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("تم تعديل الرد");
        setAddingReplay(false);
        getComments();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="p-2 border-gray rounded-xl border my-4 max-w-full overflow-x-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="bg-gray w-8 h-8 relative flex justify-center items-center rounded-full">
            <i className="fa-solid fa-user"></i>
            <img
              src={comment?.user?.profileImg}
              onError={(e) => e.target.classList.add("opacity-0")}
              className={`absolute w-8 h-8 top-0 right-0 rounded-full ${
                comment?.user?.profileImg ? "" : "opacity-0"
              }`}
              alt=""
            />
          </div>
          <div>
            <div className="text-sm"> {comment?.user?.name}</div>
            <div className="text-lightGray text-xs">
              <TimeAgo datetime={comment.createdAt} />
            </div>
          </div>
        </div>
        {myId === comment?.user?._id && (
          <div className="flex gap-2 items-center">
            <button
              className="px-2 py-1 bg-red rounded-xl"
              onClick={() => deleteComment(comment?._id)}
            >
              مسح
            </button>
            <button
              className="px-2 py-1 bg-gold rounded-xl"
              onClick={() => {
                setUpdateId(comment?._id);
                setCommentContent(comment.content);
              }}
            >
              تعديل
            </button>
          </div>
        )}
        {role === "admin" && (
          <div className="flex gap-2 items-center">
            <div>
              <button
                className="px-2 py-1 bg-red rounded-xl"
                onClick={() => deleteComment(comment?._id)}
              >
                مسح
              </button>
            </div>
            <button
              className="px-2 py-1 bg-gold rounded-xl"
              onClick={() => {
                setAddingReplay(true);
                setEditId("");
                setReplay("");
              }}
            >
              أضف رد
            </button>
          </div>
        )}
      </div>
      <div className="bg-goldenGray p-3 my-4 rounded-2xl">
        <div>{comment.content}</div>
        {comment.image && (
          <img
            className="w-1/2 cursor-pointer"
            onClick={() => {
              setImageModalSrc(comment.image);
              console.log(0);
            }}
            src={comment.image}
            alt=""
          />
        )}
      </div>
      {addingReplay && (
        <form
          onSubmit={(e) => {
            if (editId) {
              update(e);
            } else {
              createReplay(e);
            }
          }}
          className="flex gap-4 items-center mb-4"
        >
          <input
            type="text"
            placeholder="Add Comment"
            required
            autoFocus
            value={replay}
            className="rounded-full bg-goldenGray p-2 px-4 pb-3 w-full"
            onChange={(e) => setReplay(e.target.value)}
          />

          <button className="relative bg-lightGold text-gold pr-3 pl-16 font-semibold h-12 rounded-full">
            {editId ? "عدل" : "أضق"}
            <div className="absolute bg-gold text-dark w-12 h-12 flex justify-center items-center rounded-full top-0 left-0">
              <i className=" fa-solid fa-paper-plane"></i>
            </div>
          </button>
        </form>
      )}
      {comment.repiles.map((subComment) => (
        <div key={subComment} className="mx-4 bg-goldenGray p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="bg-gray w-8 h-8 relative flex justify-center items-center rounded-full">
                <i className="fa-solid fa-user"></i>
                <img
                  src={subComment?.user?.profileImg}
                  onError={(e) => e.target.classList.add("opacity-0")}
                  className={`absolute w-8 h-8 top-0 right-0 rounded-full ${
                    subComment?.user?.profileImg ? "" : "opacity-0"
                  }`}
                  alt=""
                />
              </div>
              <div>
                <div className="text-sm"> {subComment?.user?.name}</div>
                <div className="text-lightGray text-xs">(رد)</div>
              </div>
            </div>{" "}
            {role === "admin" && (
              <div className="flex gap-2 items-center">
                <div>
                  <button
                    className="px-2 py-1 bg-red rounded-xl"
                    onClick={() => deleteReplay(subComment?._id)}
                  >
                    مسح
                  </button>
                </div>
                <button
                  className="px-2 py-1 bg-gold rounded-xl"
                  onClick={() => {
                    setAddingReplay(true);
                    setReplay(subComment.content);
                    setEditId(subComment?._id);
                  }}
                >
                  تعديل
                </button>
              </div>
            )}
          </div>
          <div className="bg-blackGold p-3 my-4 rounded-2xl">
            <div>{subComment.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
