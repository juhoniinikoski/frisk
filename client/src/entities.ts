export interface Event {
  name: string;
  id: string;
  location: {
      name: string;
      latitude: number;
      longitude: number;
  };
  activity: {
      name: string;
  };
  createdBy: {
      username: string;
      id: string;
  };
  start: string;
  end: string;
}