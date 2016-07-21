import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './services/hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/templates/heroes.component.html',
    styleUrls: ['app/css/heroes.component.css'],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];
  error: any;
  addingHero = false;

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit() {
    this.getHeroes();
  }

  addHero() {
  this.addingHero = true;
  this.selectedHero = null;
}

close(savedHero: Hero) {
  this.addingHero = false;
  if (savedHero) { this.getHeroes(); }
}

deleteHero(hero: Hero, event: any) {
  event.stopPropagation();
  this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
}

  onSelect(hero: Hero) { this.selectedHero = hero; };

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }
}
