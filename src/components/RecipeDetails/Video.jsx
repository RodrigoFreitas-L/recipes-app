import React from 'react';
import PropTypes from 'prop-types';

function Video({ url }) {
  const renderVideo = () => {
    const video = (
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ url.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
    );
    return video;
  };

  return (
    <div>
      { url !== '' && renderVideo() }
    </div>
  );
}

Video.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default Video;
