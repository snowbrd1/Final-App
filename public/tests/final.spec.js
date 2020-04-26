const adventurersService = new AdventurersService();
const final = new Final(adventurersService);

describe('Final App', () => {
  it('should initialize some HTML', () => {
    spyOn(final, 'init');
    final.init();

    expect(final.init).toHaveBeenCalled();
  });

  it('should add an adventurer', async () => {
    const newAdventurer = {
      adventurer_id: 0,
      adventurer_name: 'John',
      favorite_location: 'new zealand',
      favorite_sport: 'surfing',
      favorite_outfitter: 'bobs waves',
    };
    const addAdventurerServiceSpy = spyOn(adventurersService, 'addAdventurer');

    expect(final.adventurers.length).toBe(0);

    await final.addAdventurer(newAdventurer);

    expect(addAdventurerServiceSpy).toHaveBeenCalled();
    expect(final.adventurers.length).toBe(1);
  });

  it('should delete an adventurer', async () => {
    const existingAdventurer = {
      adventurer_id: 0,
      adventurer_name: 'John',
      favorite_location: 'new zealand',
      favorite_sport: 'surfing',
      favorite_outfitter: 'bobs waves',
    };
    const deleteAdventurerServiceSpy = spyOn(adventurersService, 'deleteadventurer');

    expect(final.adventurers.length).toBe(1);

    await final.deleteAdventurer(existingAdventurer.adventurer_id);

    expect(deleteAdventurerServiceSpy).toHaveBeenCalled();
    expect(final.adventurers.length).toBe(0);
  });

  xit('should update an individual adventurer', () => {
    // ..
  });
});