import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, ItemSliding } from 'ionic-angular';
import { Task } from './task';
import { Dialogs } from 'ionic-native';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {
  tasks: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.tasks = af.database.list('/tasks');
  }

  addItem() {
    Dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '').then(
      theResult => {
        if ((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
          this.tasks.push({ title: theResult.input1, status: 'open' });
        }
      }
    )
  }

  markAsDone(slidingItem: ItemSliding, task: Task) {
    this.tasks.update(task.$key, { status: 'done' });
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task: Task) {
    this.tasks.remove(task.$key);
    slidingItem.close();
  }

}
