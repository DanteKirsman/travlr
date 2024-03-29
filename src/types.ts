export interface Activity {
  startTime: string;
  endTime: string;
  name: string;
}

export interface ActivityList {
  date: string;
  activities: Activity[];
  isEmpty: boolean;
}

export interface IPlanner {
  destination: string;
  startDate: string;
  endDate: string;
  activityLists: ActivityList[];
}

export interface TripsType {
  [key: string]: IPlanner;
}

// Foursquare api type
export interface GeoData {
  type: string;
  text: {
    primary: string;
    secondary: string;
    highlight: {
      start: number;
      length: number;
    };
  };
  geo: {
    name: string;
    center: {
      latitude: number;
      longitude: number;
    };
    bounds: {
      ne: {
        latitude: number;
        longitude: number;
      };
      sw: {
        latitude: number;
        longitude: number;
      };
    };
    cc: string;
    type: string;
  };
}
