import { Box } from "@chakra-ui/react";
import React from "react";

const YoutubeEmbed = ({ videoId }) => (
  <div className="video-responsive">
    <Box aspectRatio="16 / 9" shadow="md">
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </Box>
  </div>
);

export default YoutubeEmbed;