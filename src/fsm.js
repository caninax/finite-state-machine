class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }
        this.currentState = config.initial;
        this.states = config.states;
        this.previousState = null;
        this.nextState = null;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.states).indexOf(state) !== -1) {
            this.previousState = this.currentState;
            this.currentState = state;
            return this.currentState;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (Object.keys(this.states[this.currentState].transitions).indexOf(event) !== -1) {
            this.previousState = this.currentState;
            this.currentState = this.states[this.currentState].transitions[event];
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return Object.keys(this.states);
        } else {
            return Object.keys(this.states).filter(el => this.states[el].transitions[event] !== undefined);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState === null) {
            return false;
        } else {
            this.nextState = this.currentState;
            this.currentState = this.previousState;
            this.previousState = null;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState === null) {
            return false;
        } else {
            this.previousState = this.currentState;
            this.currentState = this.nextState;
            this.nextState = null;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.currentState = 'normal';
        this.nextState = null;
        this.previousState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/