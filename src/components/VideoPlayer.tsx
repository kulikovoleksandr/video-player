import "./VideoPlayer.scss";

import { useState, useRef, useEffect } from "react";

interface Video {
  title: string;
  url: string;
}

interface Props {
  videos: Video[];
  events: {
    title: string;
    videoTime: number;
    videoUrl: string;
  }[];
}

const VideoPlayer = ({ videos, events }: Props) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const video = videoEl.current;
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoCanPlay, setVideoCanPlay] = useState<boolean>(false);

  const [currentVideo, setCurrentVideo] = useState<Video>(videos[2]);
  const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);

  const seekValue = 5;

  const filterdEvents = events.filter(
    (item) => item.videoUrl === currentVideo.url
  );

  const [currentEvents, setCurrentEvents] = useState<{}[]>(filterdEvents);
  const onChangeHandle = (e: { target: HTMLSelectElement }) => {
    const current = videos.find((obj) => obj.title === e.target.value);
    if (current) {
      setCurrentVideo(current);
    }
  };

  const eventButtonHandle = (button: Element) => {
    const eventTimeStart = Number(button.getAttribute("data-time-start"));
    const eventTimeEnd = Number(button.getAttribute("data-time-end"));
    if (currentVideoTime >= eventTimeStart && currentVideoTime < eventTimeEnd) {
      button.classList.add("vp__event--current");
    } else {
      button.classList.remove("vp__event--current");
    }
  };

  const eventButtonsHandle = () => {
    const eventButtons: NodeListOf<Element> =
      document.querySelectorAll(".vp__event");
    eventButtons.forEach((button) => eventButtonHandle(button));
  };

  const onTimeUpdateHandle = (e: any) => {
    const currentTime = e.target.currentTime;
    setCurrentVideoTime(currentTime);
  };

  const videoPlayingHandle = () => {
    if (video) {
      if (videoPlaying) {
        setVideoPlaying(false);
        video.pause();
        return;
      }
      video.play();
      setVideoPlaying(true);
    }
  };

  const loadedMetadataHandle = (e: any) => {
    setCurrentVideoTime(e.target.currentTime);
  };

  const onLoadedDataHandle = (e: any) => {
    setCurrentVideoDuration(e.target.duration);
    if (!video) return;
    setCurrentEvents(filterdEvents);
  };

  useEffect(() => {
    eventButtonsHandle();
  }, [currentVideoTime]);

  return (
    <div className="vp">
      <div className="vp__main">
        <div className="vp__header">
          <h1 className="vp__title">{currentVideo.title}</h1>
          <select
            className="vp__select"
            value={currentVideo.title}
            onChange={(e) => {
              onChangeHandle(e);
            }}
          >
            {videos.map((video, i) => (
              <option key={i} value={video.title}>
                {video.title}
              </option>
            ))}
          </select>
        </div>
        <video
          className="vp__video"
          src={currentVideo.url}
          ref={videoEl}
          autoPlay
          muted
          onLoadedMetadata={(e) => {
            loadedMetadataHandle(e);
          }}
          onTimeUpdate={(e) => {
            onTimeUpdateHandle(e);
          }}
          onPause={() => {
            setVideoPlaying(false);
          }}
          onPlaying={() => {
            setVideoPlaying(true);
          }}
          onCanPlay={(e) => {
            setVideoCanPlay(true);
            if (videoPlaying) {
              video?.play();
            }
          }}
          onLoadedData={(e) => {
            onLoadedDataHandle(e);
          }}
        ></video>
        <div className="vp__controls">
          <button
            className="vp__button"
            type="button"
            disabled={videoCanPlay ? false : true}
            onClick={() => {
              if (video) {
                if (video.currentTime <= seekValue) {
                  video.currentTime = 0;
                } else {
                  video.currentTime -= seekValue;
                }
              }
            }}
          >
            {"-" + seekValue}
          </button>
          <button
            className="vp__button vp__button--play"
            type="button"
            disabled={videoCanPlay ? false : true}
            onClick={() => {
              videoPlayingHandle();
            }}
          >
            {videoPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="vp__button"
            type="button"
            disabled={videoCanPlay ? false : true}
            onClick={() => {
              if (video) {
                if (video.currentTime + seekValue > video.duration) {
                  video.currentTime = video.duration;
                } else {
                  video.currentTime += seekValue;
                }
              }
            }}
          >
            {"+" + seekValue}
          </button>
          <input
            type="range"
            min="0"
            step="0.01"
            value={currentVideoTime}
            max={currentVideoDuration}
            onChange={(e: { target: HTMLInputElement }) => {
              if (video) {
                video.currentTime = Number(e.target.value);
              }
            }}
            className="vp__progress-bar"
          />
        </div>
      </div>
      <div className="vp__sidebar">
        <ul className="vp__events">
          {currentEvents.map((event: any, i: number, events: any) => (
            <li className="vp__event-item" key={i}>
              <button
                data-time-start={event.videoTime}
                data-time-end={
                  events.length - 1 > i
                    ? events[i + 1].videoTime
                    : currentVideoDuration
                }
                className="vp__event"
                type="button"
                onClick={(e) => {
                  eventButtonHandle(e.currentTarget);
                  if (video) {
                    const time =
                      e.currentTarget.getAttribute("data-time-start");
                    video.currentTime = Number(time);
                    if (videoPlaying) {
                      video.play();
                    }
                  }
                }}
              >
                {event.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayer;
