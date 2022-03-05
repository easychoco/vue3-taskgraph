import _ from 'lodash'
import { v4 } from 'uuid'

// difficulty に指定できるもの
export type Difficulty = 'included' | 'easy' | 'light' | 'normal' | 'heavy' | 'hard';

export type Essential = {
  name: string,
  difficulty: Difficulty,
  description: string | undefined,
  depends: string[] | undefined,
  notes: string[] | undefined,
}

export class Task {

  uuid = v4();

  name = '';

  difficulty: Difficulty = 'included';
  
  description? = '';

  depends?: string[] = [];

  notes?: string[] = [];

  isEdit = false;

  constructor(
    name: string = 'app',
    difficulty: Difficulty = 'included',
    description: string = 'アプリ',
    depends: string[] = [],
    notes: string[] = [],
  ) {
    this.name = name;
    this.difficulty = difficulty;
    this.description = description;    
    this.depends = depends;
    this.notes = notes;    
  }

  copy() {
    const ret: Task =  _.merge(new Task(), this);
    ret.uuid = v4();
    return ret;
  }

  get cost(): number {
    if (this.difficulty === 'included') return 0;
    if (this.difficulty === 'easy') return 1;
    if (this.difficulty === 'light') return 2;
    if (this.difficulty === 'normal') return 4;
    if (this.difficulty === 'heavy') return 6;
    if (this.difficulty === 'hard') return 8;
    return 1000;
  }

  get index(): number {
    if (this.difficulty === 'included') return 0;
    if (this.difficulty === 'easy') return 1;
    if (this.difficulty === 'light') return 2;
    if (this.difficulty === 'normal') return 3;
    if (this.difficulty === 'heavy') return 4;
    if (this.difficulty === 'hard') return 5;
    return 1000;
  }

  get jsonObject(): Essential {
    return {
      name: this.name,
      difficulty: this.difficulty,
      description: this.description,
      depends: this.depends,
      notes: this.notes,
    }
  }
}
