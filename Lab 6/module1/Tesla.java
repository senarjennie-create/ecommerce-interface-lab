public class Tesla extends Car implements ElectricVehicle {

    @Override
    public void chargeBattery() {
        System.out.println("Charging Tesla battery");
    }
}