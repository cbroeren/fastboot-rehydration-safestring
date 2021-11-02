import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

const LIST_1 = [
    { id: 101, value: '1.1' },
    { id: 102, value: '1.2' },
    { id: 103, value: '1.3' },
];

const LIST_2 = [
    { id: 201, value: '2.1' },
    { id: 202, value: '2.2' },
    { id: 203, value: '2.3' },
];

function makeSafeList(list) {
    const safeList = list.map((item) => {
        return {
            ...item,
            safeValue: htmlSafe(`<span>${item.value}</span>`)
        }
    });
    return safeList;
}

export default class ListController extends Controller {
  @service fastboot;
  @tracked lists;

  constructor() {
    super(...arguments);

    if (this.fastboot.isFastBoot) {
        this.lists = [makeSafeList(LIST_2)];
    } else {
        this.lists = [makeSafeList(LIST_1), makeSafeList(LIST_2)];
    }
  }
}
