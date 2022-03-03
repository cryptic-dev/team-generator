import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hasError: boolean = false;
  newPlayerName: string = '';
  players: string[] = [];
  errorMessage: string = '';
  numberOfTeams: number | null = null;
  finalTeams: any[] = [];

  /** adds new player to array */
  addNewPlayer() {
    this.finalTeams = [];

    //if player name is empty
    if (!this.newPlayerName) {
      this.showError('Player name cannot be empty!');
      return;
    }

    //if player already exists
    if (this.players.includes(this.newPlayerName)) {
      this.showError(`Player ${this.newPlayerName} was already added.`);
      return;
    }

    this.players.push(this.newPlayerName);

    this.reset();
  }

  /** resets player name input and errors*/
  reset() {
    this.newPlayerName = '';
    this.hasError = false;
    this.errorMessage = '';
  }

  /** shows error and updates error message
   * @param message error message to be shown
   */
  showError(message: string) {
    this.errorMessage = message;
    this.hasError = true;
  }

  /** suffles players to add randomness */
  shufflePlayers() {
    let array = this.players;
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    this.players = array;
  }

  generateTeams() {
    //reset final teams
    this.finalTeams = [];

    //if number of teams is empty
    if (!this.numberOfTeams) {
      this.showError('Number of teams cannot be empty');
      return;
    }

    //if player count not enough to make teams
    if (this.numberOfTeams > this.players.length) {
      this.showError('Not enough players');
      return;
    }

    //suffle players
    this.shufflePlayers();

    //create empty arrays for every team in final teams
    for (let i = 1; i <= this.numberOfTeams; i++) {
      this.finalTeams.push([]);
    }

    //loop through players
    let lastTeamUsed = 0;

    for (let i in this.players) {
      //push new player to a selected team
      this.finalTeams[lastTeamUsed].push(this.players[i]);

      //incerement last used team
      lastTeamUsed = lastTeamUsed + 1;

      //reset last used team
      if (lastTeamUsed > this.numberOfTeams - 1) {
        lastTeamUsed = 0;
      }
    }

    console.log({ finalTeams: this.finalTeams });
  }
}
