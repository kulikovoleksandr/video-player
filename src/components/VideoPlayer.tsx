import './VideoPlayer.css';

import { useState } from 'react';

interface Props {
    videos: {
      title: string;
      url: string;
    }[];
    events: {
      title: string;
      videoTime: number;
      videoUrl: string;
    }[];
  }
   
  function VideoPlayer({ videos, events }: Props): JSX.Element {
  const [title, setTitle] = useState(videos[0].title);

    return (
        <div className="video-player">
            <div className="video-player__main">
            <span className='video-player__title'>{title}</span>
            <select 
            onChange={(e) => {
                setTitle(e.target.value)
            }} name="" id="">
                {videos.map((video, i) => (
                    <option key={i} value={video.title}>{video.title}</option>
                    ))}
            </select>
            <video className="video-player__video" src={videos[0].url}></video>
            <button>-5</button>
            <button>Play</button>
            <button>+5</button>
            <input type="range" />
            </div>
            <div className="video-player__sidebar">
            <ul>
            {events.map((event, i) => (
                    <li key={i}>
                        <button type='button'>{event.title}</button>
                    </li>
                    ))}
               
            </ul>
            </div>
        </div>
    );
  }

  export default VideoPlayer;