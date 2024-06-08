import { useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { AppContext } from "../../../App";
import getCroppedImg from "./cropImage";
import toast from "react-hot-toast";
import { IoCropSharp } from "react-icons/io5";

const ProfileImage = ({ profileImg, setProfileImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [photoURL, setPhotoURL] = useState(URL.createObjectURL(profileImg));
  useEffect(() => {
    setPhotoURL(URL.createObjectURL(profileImg));
  }, [profileImg]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, 0);
      setPhotoURL(url);
      setProfileImg(file);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      <img className="aspect-square w-32 rounded-full" src={photoURL} alt="" />
      <IoCropSharp
        className="text-xl text-gold"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="bg-[white] inset-0 fixed z-10 bg-opacity-20 flex items-center justify-center">
          <div className="bg-blackGold p-6 rounded-xl w-[50%]">
            <div className="relative aspect-square ">
              <Cropper
                image={photoURL}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onZoomChange={setZoom}
                maxZoom={10}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={cropImage}
                className="bg-gold text-dark font-semibold px-10 py-2 rounded-xl mt-4"
              >
                قص
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-dark font-semibold px-10 py-2 rounded-xl mt-4"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
