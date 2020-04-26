/**
 * @class Final
 *
 * Creates a list of adventurers and updates a list
 */

class Final {
  adventurers = [];
  adventurersService;

  constructor(adventurersService) {
    this.adventurersService = adventurersService;
  }

  init() {
    this.render();
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteAdventurer(e, index)">X</button>
   *   <span>Adventurer name</span>
   *   <span>Favorite location</span>
   *   <span>Favorite sport</span>
   *   <span>Favorite outfitter</span>
   * </li>
   */
  _renderListRowItem = (adventurer) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `adventurer-${adventurer.adventurer_id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(adventurer.adventurer_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const adventurerNameSpan = document.createElement('span');
    const adventurerName = document.createTextNode(adventurer.adventurer_name);
    adventurerNameSpan.appendChild(adventurerName);

    const adventurerLocationSpan = document.createElement('span');
    const adventurerLocation = document.createTextNode(adventurer.favorite_location);
    adventurerLocationSpan.append(adventurerLocation);

    const adventurerSportSpan = document.createElement('span');
    const adventurerSport = document.createTextNode(adventurer.favorite_sport);
    adventurerSportSpan.append(adventurerSport);

    const adventurerOutfitterSpan = document.createElement('span');
    const adventurerOutfitter = document.createTextNode(adventurer.favorite_outfitter);
    adventurerOutfitterSpan.append(adventurerOutfitter);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(adventurerNameSpan);
    listGroupItem.append(adventurerLocationSpan);
    listGroupItem.append(adventurerSportSpan);
    listGroupItem.append(adventurerOutfitter);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const adventurersDiv = document.getElementById('adventurers');
    const loadingDiv = adventurersDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'adventurers-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.adventurers.map((adventurer) => {
      const listGroupRowItem = this._renderListRowItem(adventurer);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    adventurersDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const adventurersDiv = document.getElementById('adventurers');
    const loadingDiv = adventurersDiv.childNodes[0];
    const listParent = document.getElementById('adventurers-list');
    const msgDiv = this._createMsgElement('Add your new adventurer friends!');

    if (adventurersDiv) {
      adventurersDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      adventurersDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding an adventurer.
   *
   * @param {Object} newAdventurer - form's values as an object
   */
  addAdventurer = async (newAdventurer) => {
    try {
      const { adventurer_name, favorite_location, favorite_sport, favorite_outfitter } = newAdventurer;
      await this.adventurersService.addAdventurer({ adventurer_name, favorite_location, favorite_sport, favorite_outfitter }); // we just want the name and location

      this.adventurers.push(newAdventurer); // push adventurer with all its parts

    } catch (err) {
      console.log(err);
      alert('Unable to add adventurer. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for adding an adventurer to the DOM.
   *
   * @param {number} adventurerId - id of the adventurer to delete
   */
  _addAdventurerEventHandler = () => {
    const adventurerInput = document.getElementById('formInputAdventurerName');
    const adventurer_name = adventurerInput.value;

    const locationInput = document.getElementById('formInputAdventurerLocation');
    const favorite_location = locationInput.value;

    const sportInput = document.getElementById('formInputAdventurerSport');
    const favorite_sport = sportInput.value;

    const outfitterInput = document.getElementById('formInputAdventurerOutfitter');
    const favorite_outfitter = outfitterInput.value;

    // validation checks
    if (!adventurer_name) {
      alert('Please enter an adventurer name.');
      return;
    }

    if (!favorite_location) {
      alert('Please enter an adventurer location.');
      return;
    }

    if (!favorite_sport) {
      alert('Please enter an adventurer sport.');
      return;
    }

    if (!favorite_outfitter) {
      alert('Please enter an adventurer outfitter.');
      return;
    }

    const adventurer = { adventurer_name, favorite_location, favorite_sport, favorite_outfitter }; // assemble the new adventurer parts
    const { newAdventurer, newAdventurerEl } = this._createNewAdventurerEl(adventurer); // add adventurer to list

    this.addAdventurer(newAdventurer);

    const listParent = document.getElementById('adventurers-list');

    if (listParent) {
      listParent.appendChild(newAdventurerEl);
    } else {
      this._renderList();
    }
    adventurerInput.value = ''; // clear form text input
    locationInput.value = '';
    sportInput.value = '';
    outfitterInput.value = '';
  };

  /**
   * Create the DOM element for the new adventurer with all its parts.
   *
   * @param {Object} adventurer - { adventurer_name, location } partial status object
   */
  _createNewAdventurerEl = (adventurer) => {
    const adventurer_id = this.adventurers.length;
    const newAdventurer = { ...adventurer, adventurer_id };
    const newAdventurerEl = this._renderListRowItem(newAdventurer);

    return { newAdventurer, newAdventurerEl };
  };

  /**
   * Pure function for deleting an adventurer.
   *
   * @param {number} adventurerId - id for the adventurer to be deleted
   */
  deleteAdventurer = async (adventurerId) => {
    try {
      const res = await this.adventurersService.deleteAdventurer(adventurerId);
      this.adventurers = this.adventurers.filter((adventurer) => adventurer.adventurer_id !== adventurerId);

      if (res !== null) {
        alert('Adventurer deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete adventurer. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for deleting an adventurer from the DOM.
   * This relies on a pre-existing in the list of adventurers.
   *
   * @param {number} adventurerId - id of the adventurer to delete
   */
  _deleteEventHandler = (adventurerId) => () => {
    const adventurer = document.getElementById(`adventurer-${adventurerId}`);
    adventurer.remove();

    this.deleteAdventurer(adventurerId).then(() => {
      if (!this.adventurers.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const adventurers = await this.adventurersService.getAdventurers();

    try {
      if (adventurers.length) {
        this.adventurers = adventurers;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
     }
    }
  };