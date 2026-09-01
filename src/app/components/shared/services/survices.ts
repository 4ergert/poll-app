import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class Survices {
  supabase = createClient('https://ifoidagatwwfdivhzvcw.supabase.co/rest/v1/', 'sb_publishable_ceUCpzz33kkThuMO6nTylg_kYwvskeQ')

  async getSurveys() {
    let data = await this.supabase
      .from('Survey_Form')
      .select('*')
    console.log(data)
  }

  constructor() {
    this.getSurveys()
  }
}
