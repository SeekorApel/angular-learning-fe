import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/model/Plant';
import { ApiResponse } from 'src/app/response/Response';
import { PlantService } from 'src/app/services/plant/plant.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {

  plants: Plant[] = [];
  newPlant: Plant = new Plant();
  editPlant: Plant = new Plant();
  errorMessage: string | null = null;
  isEditMode: boolean = false;
  pagedPlants: Plant[] = []; // Data plant yang ditampilkan pada halaman tertentu
  pageSize: number = 5;      // Jumlah item per halaman
  currentPage: number = 1;   // Halaman saat ini
  totalItems: number = 0; 


  constructor(private plantService: PlantService) { 
  }

  openModalAdd(): void {
    this.newPlant = new Plant();
    $('#addModal').modal('show');
  }

  openModalEdit(idPlant: number): void {
    this.isEditMode = true;
    this.getPlantById(idPlant);
    $('#editModal').modal('show');
  }

  ngOnInit(): void {
    this.getAllPlant();
    const plantId = 1;
    this.getPlantById(plantId);
  }

  getPlantById(idPlant: number): void {
    this.plantService.getPlantById(idPlant).subscribe(
      (response: ApiResponse<Plant>) => {
        this.editPlant = response.data;
      },
      (error) => {
        this.errorMessage = 'Failed to load plants: ' + error.message;
      }
    )
  }

  getAllPlant(): void {
    this.plantService.getAllPlant().subscribe(
      (response: ApiResponse<Plant[]>) => {
        this.plants = response.data;
        this.totalItems = this.plants.length; // Set totalItems based on the length of plants
        this.updatePagedPlants();
      },
      (error) => {
        this.errorMessage = 'Failed to load plants: ' + error.message;
      }
    );
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.updatePagedPlants();
  }

  updatePagedPlants(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedPlants = this.plants.slice(startIndex, startIndex + this.pageSize);
  }

  addPlant(): void {
    this.plantService.addPlant(this.newPlant).subscribe(
      (response) => {
        // SweetAlert setelah berhasil
        Swal.fire({
          title: 'Success!',
          text: 'Data Plant berhasil di isi.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.getAllPlant();
            this.resetForm();
            $('#addModal').modal('hide');
          }
        });
      },
      (err) => {
        Swal.fire('Error!', 'Failed to add the plant.', 'error');
      }
    );
  }


  updatePlant(): void {
    this.plantService.updatePlant(this.editPlant).subscribe(
      (response) => {
        // SweetAlert setelah update berhasil
        Swal.fire({
          title: 'Success!',
          text: 'Data Plant Berhasil di Update.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh data plant setelah update
            this.getAllPlant();
            this.resetForm(); // Reset formulir
            $('#editModal').modal('hide'); // Sembunyikan modal setelah update
          }
        });
      },
      (err) => {
        // SweetAlert ketika gagal
        Swal.fire('Error!', 'Terjadi Kesalahan dalam mengupdate data.', 'error');
        console.error('Error updating plant:', err);
      }
    );
  }


  deleteData(idPlant: number): void {
    Swal.fire({
      title: 'Apakah Anda Yakin Ingin Menghapus Data ini ?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantService.deletePlant(idPlant).subscribe({
          next: (response) => {
            // Tampilkan pesan sukses setelah penghapusan
            Swal.fire(
              'Deleted!',
              'Your plant has been deleted.',
              'success'
            );
            // Refresh data plant setelah penghapusan
            this.getAllPlant();
          },
          error: (err) => {
            console.error('Error deleting plant:', err);
            Swal.fire('Error!', 'Failed to delete the plant.', 'error');
          }
        });
      }
    });
  }


  resetForm(): void {
    this.newPlant = new Plant(); // Reset objek newPlant
  }

}
