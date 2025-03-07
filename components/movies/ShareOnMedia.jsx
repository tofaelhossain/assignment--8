"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShareOnMedia({ movie }) {
  const [currentUrl, setCurrentUrl] = useState("");
  //console.log("share", movie);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = (platform) => {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(movie.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}&title=${encodeURIComponent(movie.title)}&summary=${encodeURIComponent(
        movie.description
      )}&source=${encodeURIComponent(currentUrl)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-gray-400 mb-2">Share on social media</h3>
        <div className="flex flex-wrap gap-4">
          <button
            className="text-center cursor-pointer"
            onClick={() => handleShare("facebook")}
          >
            <Image
              src="http://facebook.com/favicon.ico"
              alt="Facebook"
              className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
              width={100}
              height={100}
            />
            <p className="text-sm">Facebook</p>
          </button>

          <button
            className="text-center cursor-pointer"
            onClick={() => handleShare("x")}
          >
            <Image
              src="http://x.com/favicon.ico"
              alt="X"
              className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
              width={100}
              height={100}
            />
            <p className="text-sm">X</p>
          </button>

          <button
            className="text-center cursor-pointer"
            onClick={() => handleShare("linkedin")}
          >
            <Image
              src="http://linkedin.com/favicon.ico"
              alt="LinkedIn"
              className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
              width={100}
              height={100}
            />
            <p className="text-sm">LinkedIn</p>
          </button>
        </div>
      </div>
    </>
  );
}
