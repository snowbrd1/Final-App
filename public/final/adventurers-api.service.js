const ADVENTURERS_API = `${BASE_API_URL}/adventurers`; // http://localhost:4000/api/adventurers

class AdventurersService {
  getAdventurers = () => _get(ADVENTURERS_API, OPTIONS_WITH_AUTH);

  addAdventurer = (formData) => _post(ADVENTURERS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteAdventurer = (adventurerId) => _delete(`${ADVENTURERS_API}/${adventurerId}`, OPTIONS_WITH_AUTH);
}