interface WhoMedia {
  poster?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

// Add the approved local poster and its description/dimensions when supplied.
// An absent poster keeps the accessible media placeholder visible.
export const whoMedia: WhoMedia = {};
