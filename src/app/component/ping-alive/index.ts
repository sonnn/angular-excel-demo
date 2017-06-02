import { Component } from '@angular/core';

@Component({
  selector: 'ping-alive',
  templateUrl: './template.html',
})
export class PingAlive {
  timeout: any = null;
  delay: Number = 30000;
  showError: Boolean = false;

  /**
   * start timeout loop check network
   * @memberof PingAlive
   */
  start() {
    this.timeout = setTimeout(() => {
      fetch('/ping').then(res => {
        res.json().then(response => {
          this.showError = !response || !response.pong;
          this.start();
        });
      }).catch(error => {
        this.showError = true;
        this.start();
      });
    }, this.delay);
  }

  /**
   * stop by clear timeout
   * @memberof PingAlive
   */
  stop() {
    clearTimeout(this.timeout);
  }

  /**
   * start when component init
   * @memberof PingAlive
   */
  ngOnInit() {
    this.start();
  }

  /**
   * remove timeout
   * @memberof PingAlive
   */
  ngOnDestroy() {
    this.stop();
  }
}
