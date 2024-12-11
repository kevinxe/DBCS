import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recharge } from 'src/app/models/recharge.model';
import { RechargeService } from 'src/app/services/recharge.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recharges-list',
  templateUrl: './recharges-list.component.html',
  styleUrls: ['./recharges-list.component.css']
})
export class RechargesListComponent implements OnInit {
  recharges: Recharge[] = [];
  totalCost: number = 0;
  userId : number | undefined;
  isConfirmationPopupOpen = false;
  rechargeIdToConfirm: number | null = null;

  constructor(private rechargeService: RechargeService, private route : ActivatedRoute, private notificationService : NotificationService
    , private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdStr = params.get('id');
      
      if (userIdStr) {
        this.userId = +userIdStr; 
        this.loadRecharges(this.userId);
      }
 
    });
  }

  loadRecharges(userId : number): void {
   
    this.rechargeService.getRechargesByUserId(userId).subscribe({
      next: (data: Recharge[]) => {
        this.recharges = data;
        this.calculateTotalCost();
      },
      error: (error) => {
        console.error('Error al obtener las recargas', error);
      }
    });
  }

  startRecharge() {
    const index=this.rechargeIdToConfirm;
    this.rechargeService.updateRecharge(index!, "start").subscribe({
      next: (response) => {
       
        this.loadRecharges(this.userId!);
        this.cdr.detectChanges();
        this.closeConfirmationPopup();
        this.notificationService.showSuccess("Recarga comenzada con exito");
      },
      error: (error) => {
        this.notificationService.showError("Ha habido un error al comenzar la recarga");
        this.closeConfirmationPopup();
      }
    });
   
  }

  stopRecharge(index : number) {
   
    this.rechargeService.updateRecharge(index!, "end").subscribe({
      next: (response) => {
        this.loadRecharges(this.userId!);
        this.cdr.detectChanges();
        this.closeConfirmationPopup();
        
      },
      error: (error) => {
        this.notificationService.showError("Ha habido un error al parar la recarga");
        this.closeConfirmationPopup();
      }
    });

  
    
  }

  openConfirmationPopup(rechargeId : number) {
    this.isConfirmationPopupOpen = true;
    this.rechargeIdToConfirm= rechargeId;
   
  }

  closeConfirmationPopup() {
    this.isConfirmationPopupOpen = false;
  }
  

  cancelRecharge() {
    
    const index= this.rechargeIdToConfirm;
    this.rechargeService.updateRecharge(index!, "cancel").subscribe({
      next: (response) => {
        
        this.closeConfirmationPopup();
      },
      error: (error) => {
        this.notificationService.showError("Ha habido un error al cancelar la recarga");
        this.closeConfirmationPopup();
      }
    });
   
    this.loadRecharges(this.userId!);
    this.closeConfirmationPopup();
  }

  calculateTotalCost(): void {
    this.totalCost = this.recharges.reduce((acc, recharge) => acc + (recharge.kw! * recharge.price!), 0);
  }
}
