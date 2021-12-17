import axios from 'axios';

const TRIPS_REST_API_URL_CREATE_UPDATE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips';
const TRIPS_REST_API_URL_READ_ALL = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/getAll/';
const TRIPS_REST_API_URL_DELETE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/';
const TRIPS_REST_API_URL_READ = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/';

class TripService {

    createTrip(trip) {
        return axios.post(TRIPS_REST_API_URL_CREATE_UPDATE, 
            "{ \"tripName\": " + JSON.stringify(trip.tripName) + ", \"user\": { \"userId\": " + sessionStorage.getItem('userId') + "} }" , {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
            }
        }); 
    }

    getAllTrips() {
        return axios.get(TRIPS_REST_API_URL_READ_ALL + sessionStorage.getItem('userId'), {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
              "Content-Type": "application/json",
            }
        });
    }

    getTrip() {
        return axios.get(TRIPS_REST_API_URL_READ + sessionStorage.getItem('tripId'), {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
              }
        });
    }

    editTrip(trip) {
        return axios.put(TRIPS_REST_API_URL_CREATE_UPDATE,
            "{ \"tripId\": " + sessionStorage.getItem('tripId') + 
            ", \"tripName\": " + JSON.stringify(trip.tripName) +
            ", \"user\": { \"userId\": " + sessionStorage.getItem("userId") + "} }", {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                    "Content-Type": "application/json",
                }
            });
    }

    deleteTrip(tripId) {
        console.log(tripId);
        console.log(TRIPS_REST_API_URL_DELETE + tripId);
        return axios.delete(TRIPS_REST_API_URL_DELETE + tripId, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
            }
        })
    }

}

export default new TripService();