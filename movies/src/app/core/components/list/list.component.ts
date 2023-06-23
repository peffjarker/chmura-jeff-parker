import { Component, HostListener, Input, OnInit } from '@angular/core'
import { IActor, IMovie, IValidation } from '../../models/service_models'
import { ACCESS_CODE, KEANU_REEVES_ACTOR_ID, NICOLAS_CAGE_ACTOR_ID } from '../../constants/service_constants'
import { ListService } from '../../../services/list.service'
import { HttpResponse } from '@angular/common/http'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  actors: IActor[] = []
  movies: IMovie[] = []
  actorIdNameMap: Map<number, string> = new Map()
  validationData: { [name: string]: IValidation | undefined } = {}
  listToValidate: IValidation[] = []
  listLength: number = -1
  validationStatus: number = -1
  public innerWidth: any;

  constructor(private listService: ListService) {     
  }

   ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.fetchListData()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  async fetchListData() {
    this.actors = await this.listService.getActors(ACCESS_CODE)
    this.movies = await this.listService.getMovies(ACCESS_CODE)
    this.listNameOfActors()
    this.populateRecords()
    this.findCommonActors()
    this.resizeList()
    this.validateList()
    console.log(this.validationData)
  }

  listNameOfActors() {
    this.actors?.forEach(actor => {
      this.actorIdNameMap?.set(actor.actorId, actor.name)
    })
  }

  populateRecords() {
    this.actors.forEach(actor => {
      const tempValidationInfo: IValidation = {
        Name: actor.name,
        KRMovies: [],
        NCMovies: []
      }
      this.validationData[actor.name] = tempValidationInfo;
    })
  }
  
  findCommonActors() {
    this.movies?.forEach(movie => {
      if (movie.actors.includes(KEANU_REEVES_ACTOR_ID)) {
        movie.actors.forEach(actor => {
          if (actor !== KEANU_REEVES_ACTOR_ID) {
            const index = this.actorIdNameMap.get(actor)
            this.validationData[index as string]?.KRMovies.push(movie.title)
          } 
        })
      }
      if (movie.actors.includes(NICOLAS_CAGE_ACTOR_ID)) {
        movie.actors.forEach(actor => {
          if (actor !== NICOLAS_CAGE_ACTOR_ID) {
            const index = this.actorIdNameMap.get(actor)
            this.validationData[index as string]?.NCMovies.push(movie.title)
          } 
        })
      }
    })
    console.log(this.validationData)
  }

  resizeList() {
    this.actorIdNameMap.forEach(actor => {
      if (this.validationData[actor] !== undefined) {
        if (this.validationData[actor]?.KRMovies.length === 0 || this.validationData[actor]?.NCMovies?.length === 0) {
          delete this.validationData[actor]
        } else {
          this.listToValidate.push(this.validationData[actor] as IValidation)
        }
      }
    })
  }

  async validateList() {
    this.validationStatus = (await this.listService.validateList(ACCESS_CODE, this.listToValidate)).status
    this.listLength = this.listToValidate.length
  }

  cols: number = this.getRandomInt(3)
  rows: number = this.getRandomInt(3)

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
