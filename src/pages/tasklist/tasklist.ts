import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NavController, ItemSliding, AlertController } from 'ionic-angular';
import { Task } from './task';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {
  //tasks: AngularFireList<Task>];
  //tasks: Observable<any[]>;
  taskList: AngularFireList<Task>;
  tasks: Observable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public dialogs: Dialogs, public alertCtrl: AlertController, ) {
    this.taskList = this.af.list('/tasks');
    this.tasks = this.taskList.valueChanges();

  }

  addItem() {
    // this.dialogs.prompt('Add a task', 'Ionic2Do', ['OK', 'Cancel'], '').then(
    //   theResult => {
    //     if ((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
    //       const newTaskRef = this.taskList.push({ id: '', title: data.task, status: 'open' });
    //       newTaskRef.update({ id: newTaskRef.key});
    //     }
    //   }
    // )

    let prompt = this.alertCtrl.create({
      title: 'Ionic2Do',
      message: "Add a task",
      inputs: [
        {
          name: 'task',
          placeholder: 'Task'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            const newTaskRef = this.taskList.push({ id: '', title: data.task, status: 'open' });
            newTaskRef.update({ id: newTaskRef.key});
          }
        }
      ]
    });
    prompt.present();

  }

  markAsDone(slidingItem: ItemSliding, task: Task) {
    task.status = 'done';
    this.taskList.update(task.id, task)
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task: Task) {
    this.taskList.remove(task.id);
    slidingItem.close();
  }

}
