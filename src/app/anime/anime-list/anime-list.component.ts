import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: Array<Anime> = [];
  selected: Boolean = false;
  selectedAnime!: Anime;
  constructor(private animeService: AnimeService) { }

  ngOnInit():void {
    this.getAnimes();
  }

  getAnimes():void{
    this.animeService.getAnimes().subscribe((animes) =>{
      this.animes = animes;
    })
  }

  onSelected(anime: Anime): void{
    this.selected = true;
    this.selectedAnime = anime;
  }

  totalEpisodios(): number{
    let total = 0;
    for (const a of this.animes){
      total = total + a.episode
    }
    return total
  }

  averageRating(): string{
    let suma = 0;
    const total = this.animes.length;
    for (const a of this.animes){
      const rat = parseFloat(a.Rating)
      suma = suma + rat
    }
    const avg = suma/total;
    const resp = avg.toFixed(2);
    return resp
  }


}
