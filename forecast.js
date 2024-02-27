
const apiKey = "IRBCeej2F2l2QAclPbxzUXpaOFDv8KGg"
const baseUrl = "http://dataservice.accuweather.com";

const getCity = async (city) => {
    try {
        const query = `?apikey=${apiKey}&q=${encodeURIComponent(city)}`;
        const response = await fetch(`${baseUrl}/locations/v1/cities/search${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch city data: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error("Error in getCity:", error);
        throw error;
    }
};

const getConditions = async (locKey) => {
    try {
        const query = `/${locKey}?apikey=${apiKey}`;
        const response = await fetch(`${baseUrl}/currentconditions/v1${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch conditions: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error("Error in getConditions:", error);
        throw error;
    }
};



