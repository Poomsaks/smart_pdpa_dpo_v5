import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }
  authenticate_dpo(applicationData: any): Observable<any> {
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/authenticate_dpo", {
      params: {
        username: applicationData.login,
        password: applicationData.password,
      }
    }, { withCredentials: true });
  }

  update_document(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
        doc_detail_ids: applicationData.doc_detail_ids
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/update_document", payload, { withCredentials: true })
  }
  add_document(applicationData: any): Observable<any> {
    const payload = {
      params: {
        name: applicationData.name,
        name_create_id: applicationData.name_create_id,
        inspector_id: applicationData.inspector_id,
        document_status: applicationData.document_status,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/add_document", payload, { withCredentials: true })
  }
  update_comment_document(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
        comment: applicationData.comment
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/update_comment_document", payload, { withCredentials: true })
  }
  update_status_document_by_cate(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
        partner_id: applicationData.partner_id,
        document_status: applicationData.document_status
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/update_status_document_by_cate", payload, { withCredentials: true })
  }


  add_document_detail(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
        doc_detail_ids: applicationData.doc_detail_ids,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/add_document_detail", payload, { withCredentials: true })
  }
  get_document_for_detail_by_id(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_document_for_detail_by_id", payload, { withCredentials: true })
  }
  get_status_document_for_detail_by_id(applicationData: any): Observable<any> {
    const payload = {
      params: {
        id: applicationData.id,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_status_document_for_detail_by_id", payload, { withCredentials: true })
  }

  add_status_document_detail(applicationData: any): Observable<any> {
    const payload = {
      params: {
        name: applicationData.name,
        name_create_id: applicationData.name_create_id,
        document_status: '1',
        inspector_id: applicationData.inspector_id,
        doc_detail_ids: applicationData.doc_detail_ids,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/add_status_document_detail", payload, { withCredentials: true })
  }

  get_partner(): Observable<any> {
    const payload = {
      params: {
        db: environment.config.baseConfig.dbServer
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_partner", payload, { withCredentials: true })
  }
  get_document_search(): Observable<any> {
    const payload = {
      params: {
        db: environment.config.baseConfig.dbServer
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_document_search", payload, { withCredentials: true })
  }
  get_status_document_search(partner_id : number): Observable<any> {
    const payload = {
      params: {
        partner_id: partner_id
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_status_document_search", payload, { withCredentials: true })
  }

  get_document_for_detail(): Observable<any> {
    const payload = {
      params: {
        db: environment.config.baseConfig.dbServer
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_document_for_detail", payload, { withCredentials: true })
  }

  add_member(applicationData: any): Observable<any> {
    const payload = {
      params: {
        name: applicationData.name,
        phone: applicationData.phone,
        email: applicationData.email,
        username: applicationData.username,
        password: applicationData.password,

        card_number_id: applicationData.card_number_id,
        relation_status: applicationData.relation_status,
        relation_detail: applicationData.relation_detail,

        document_type_1: applicationData.document_type_1,
        document_name_1: applicationData.document_name_1,
        document_attach_1: applicationData.document_attach_1,

        document_type_2: applicationData.document_type_2,
        document_name_2: applicationData.document_name_2,
        document_attach_2: applicationData.document_attach_2,

        document_type_3: applicationData.document_type_3,
        document_name_3: applicationData.document_name_3,
        document_attach_3: applicationData.document_attach_3,
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/add_member", payload, { withCredentials: true })
  }

  get_data_dashboard(): Observable<any> {
    const payload = {
      params: {
        // db: environment.config.baseConfig.dbServer
      }
    };
    return this.http.post<any>(environment.config.baseConfig.apiUrl + "/api/get_data_dashboard", payload, { withCredentials: true })
  }

}
