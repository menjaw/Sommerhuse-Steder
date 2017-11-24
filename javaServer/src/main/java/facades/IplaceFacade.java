/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Place;
import java.util.List;

/**
 *
 * @author danni
 */
public interface IplaceFacade {
    public void createPlace(Place place);
    public List<Place> getPlaces();
    public Place editPlace(Place place);
    public void deletePlace(Long id);
    public Place getPlace(Long id);
}
