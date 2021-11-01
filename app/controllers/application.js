import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { htmlSafe } from '@ember/template';

export default class ApplicationController extends Controller {
    @service fastboot;
    @tracked value;

    get safeValue() {
        const safe = htmlSafe(this.value);
        return safe;
    }

    @action
    generateNewValue() {
        this.value = `<span class="clientside-value">Random ${guidFor({})}</span>`;
    }

    constructor() {
        super(...arguments);

        if (this.fastboot.isFastBoot) {
            this.value = `<span class="fastboot-value">Fastboot Initial Value</span>`;
        } else {
            this.generateNewValue();
        }

    }
}